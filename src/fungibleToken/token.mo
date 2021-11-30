import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Types "./types";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import ExperimentalCycles "mo:base/ExperimentalCycles";

actor Token {
    type Operation = Types.Operation;
    type TransactionStatus = Types.TransactionStatus;
    type TxRecord = Types.TxRecord;
    type Metadata = {
        logo : Text;
        name : Text;
        symbol : Text;
        decimals : Nat8;
        totalSupply : Nat;
        owner : Principal;
        fee : Nat;
    };
    // returns tx index or error msg
    type TxReceipt = Result.Result<Nat, {
        #InsufficientBalance;
        #InsufficientAllowance;
    }>;

    private stable var owner_ : ?Principal = null;
    private stable var logo_ : Text = "Logo";
    private stable var name_ : Text = "Veiling Coin";
    private stable var decimals_ : Nat8 = 3;
    private stable var symbol_ : Text = "VLG";
    private stable var totalSupply_ : Nat = 1000000000000000;
    private stable var blackhole : Principal = Principal.fromText("aaaaa-aa");
    private stable var feeTo : ?Principal = null;
    private stable var fee : Nat = 0;
    private stable var balanceEntries : [(Principal, Nat)] = [];
    private stable var allowanceEntries : [(Principal, [(Principal, Nat)])] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    private var allowances = HashMap.HashMap<Principal, HashMap.HashMap<Principal, Nat>>(1, Principal.equal, Principal.hash);
    private stable var genesis : ?TxRecord = null;
    private stable var ops : [TxRecord] = [];

    public func init(owner : Principal) : async () {
        assert(owner_ == null);
        owner_ := ?owner;
        feeTo := ?owner;
        balances.put(owner, totalSupply_);
        genesis := ?({
            caller = ?owner;
            op = #mint;
            index = 0;
            from = blackhole;
            to = owner;
            amount = totalSupply_;
            fee = 0;
            timestamp = Time.now();
            status = #succeeded;
        });
    };

    private func addRecord(
        caller: ?Principal, op: Operation, from: Principal, to: Principal, amount: Nat,
        fee: Nat, timestamp: Time.Time, status: TransactionStatus
    ): Nat {
        let index = ops.size();
        let o : TxRecord = {
            caller = caller;
            op = op;
            index = index;
            from = from;
            to = to;
            amount = amount;
            fee = fee;
            timestamp = timestamp;
            status = status;
        };
        ops := Array.append(ops, [o]);
        return index;
    };

    private func _chargeFee(from: Principal, fee: Nat) {
        let feeToUnwrapped = Types.unwrap<Principal>(feeTo);
        if(fee > 0) {
            _transfer(from, feeToUnwrapped, fee);
        };
    };

    private func _transfer(from: Principal, to: Principal, value: Nat) {
        let from_balance = _balanceOf(from);
        let from_balance_new : Nat = from_balance - value;
        if (from_balance_new != 0) { balances.put(from, from_balance_new); }
        else { balances.delete(from); };

        let to_balance = _balanceOf(to);
        let to_balance_new : Nat = to_balance + value;
        if (to_balance_new != 0) { balances.put(to, to_balance_new); };
    };

    private func _balanceOf(who: Principal) : Nat {
        switch (balances.get(who)) {
            case (?balance) { return balance; };
            case (_) { return 0; };
        }
    };

    private func _allowance(owner: Principal, spender: Principal) : Nat {
        switch(allowances.get(owner)) {
            case (?allowance_owner) {
                switch(allowance_owner.get(spender)) {
                    case (?allowance) { return allowance; };
                    case (_) { return 0; };
                }
            };
            case (_) { return 0; };
        }
    };

    /*
    *   Core interfaces: 
    *       update calls: 
    *           transfer/transferFrom/approve
    *       query calls: 
    *           logo/name/symbol/decimal/totalSupply/balanceOf/allowance/getMetadata
    *           historySize/getTransaction/getTransactions
    */

    /// Transfers value amount of tokens to Principal to.
    public shared(msg) func transfer(to: Principal, value: Nat) : async TxReceipt {
        if (_balanceOf(msg.caller) < value + fee) { return #err(#InsufficientBalance); };
        _chargeFee(msg.caller, fee);
        _transfer(msg.caller, to, value);
        let txid = addRecord(null, #transfer, msg.caller, to, value, fee, Time.now(), #succeeded);
        return #ok(txid);
    };

    /// Transfers value amount of tokens from Principal from to Principal to.
    public shared(msg) func transferFrom(from: Principal, to: Principal, value: Nat) : async TxReceipt {
        if (_balanceOf(from) < value + fee) { return #err(#InsufficientBalance); };
        let allowed : Nat = _allowance(from, msg.caller);
        if (allowed < value + fee) { return #err(#InsufficientAllowance); };
        _chargeFee(from, fee);
        _transfer(from, to, value);
        let allowed_new : Nat = allowed - value - fee;
        if (allowed_new != 0) {
            let allowance_from = Types.unwrap(allowances.get(from));
            allowance_from.put(msg.caller, allowed_new);
            allowances.put(from, allowance_from);
        } else {
            if (allowed != 0) {
                let allowance_from = Types.unwrap(allowances.get(from));
                allowance_from.delete(msg.caller);
                if (allowance_from.size() == 0) { allowances.delete(from); }
                else { allowances.put(from, allowance_from); };
            };
        };
        let txid = addRecord(?msg.caller, #transferFrom, from, to, value, fee, Time.now(), #succeeded);
        return #ok(txid);
    };

    /// Allows spender to withdraw from your account multiple times, up to the value amount. 
    /// If this function is called again it overwrites the current allowance with value.
    public shared(msg) func approve(spender: Principal, value: Nat) : async TxReceipt {
        if(_balanceOf(msg.caller) < fee) { return #err(#InsufficientBalance); };
        _chargeFee(msg.caller, fee);
        let v = value + fee;
        if (value == 0 and Option.isSome(allowances.get(msg.caller))) {
            let allowance_caller = Types.unwrap(allowances.get(msg.caller));
            allowance_caller.delete(spender);
            if (allowance_caller.size() == 0) { allowances.delete(msg.caller); }
            else { allowances.put(msg.caller, allowance_caller); };
        } else if (value != 0 and Option.isNull(allowances.get(msg.caller))) {
            var temp = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
            temp.put(spender, v);
            allowances.put(msg.caller, temp);
        } else if (value != 0 and Option.isSome(allowances.get(msg.caller))) {
            let allowance_caller = Types.unwrap(allowances.get(msg.caller));
            allowance_caller.put(spender, v);
            allowances.put(msg.caller, allowance_caller);
        };
        let txid = addRecord(null, #approve, msg.caller, spender, v, fee, Time.now(), #succeeded);
        return #ok(txid);
    };

    public query func logo() : async Text {
        return logo_;
    };

    public query func name() : async Text {
        return name_;
    };

    public query func symbol() : async Text {
        return symbol_;
    };

    public query func decimals() : async Nat8 {
        return decimals_;
    };

    public query func totalSupply() : async Nat {
        return totalSupply_;
    };

    public query func balanceOf(who: Principal) : async Nat {
        return _balanceOf(who);
    };

    public query func allowance(owner: Principal, spender: Principal) : async Nat {
        return _allowance(owner, spender);
    };

    public query func getMetadata() : async Metadata {
        let owner = Types.unwrap<Principal>(owner_);
        return {
            logo = logo_;
            name = name_;
            symbol = symbol_;
            decimals = decimals_;
            totalSupply = totalSupply_;
            owner;
            fee = fee;
        };
    };

    /// Get transaction history size
    public query func historySize() : async Nat {
        return ops.size();
    };

    /// Get transaction by index.
    public query func getTransaction(index: Nat) : async TxRecord {
        return ops[index];
    };

    /// Get history
    public query func getTransactions(start: Nat, limit: Nat) : async [TxRecord] {
        var ret: [TxRecord] = [];
        var i = start;
        while(i < start + limit and i < ops.size()) {
            ret := Array.append(ret, [ops[i]]);
            i += 1;
        };
        return ret;
    };

    /*
    *   Optional interfaces:
    *       setLogo/setFee/setFeeTo/setOwner
    *       getUserTransactionsAmount/getUserTransactions
    *       getTokenInfo/getHolders/getUserApprovals
    */
    public shared(msg) func setLogo(logo: Text) {
        assert(?msg.caller == owner_);
        logo_ := logo;
    };

    public shared(msg) func setFeeTo(to: Principal) {
        assert(?msg.caller == owner_);
        feeTo := ?to;
    };

    public shared(msg) func setFee(_fee: Nat) {
        assert(?msg.caller == owner_);
        fee := _fee;
    };

    public shared(msg) func setOwner(_owner: Principal) {
        assert(?msg.caller == owner_);
        owner_ := ?_owner;
    };

    public query func getUserTransactionAmount(a: Principal) : async Nat {
        var res: Nat = 0;
        for (i in ops.vals()) {
            if (i.caller == ?a or i.from == a or i.to == a) {
                res += 1;
            };
        };
        return res;
    };

    public query func getUserTransactions(a: Principal, start: Nat, limit: Nat) : async [TxRecord] {
        var res: [TxRecord] = [];
        var index: Nat = 0;
        for (i in ops.vals()) {
            if (i.caller == ?a or i.from == a or i.to == a) {
                if(index >= start and index < start + limit) {
                    res := Array.append<TxRecord>(res, [i]);
                };
                index += 1;
            };
        };
        return res;
    };

    public type TokenInfo = {
        metadata: Metadata;
        feeTo: Principal;
        // status info
        historySize: Nat;
        deployTime: Time.Time;
        holderNumber: Nat;
        cycles: Nat;
    };
    public query func getTokenInfo(): async TokenInfo {
        let owner = Types.unwrap<Principal>(owner_);
        let feeToUnwrapped = Types.unwrap<Principal>(feeTo);
        let genesisUnwrapped = Types.unwrap<TxRecord>(genesis);
        {
            metadata = {
                logo = logo_;
                name = name_;
                symbol = symbol_;
                decimals = decimals_;
                totalSupply = totalSupply_;
                owner;
                fee = fee;
            };
            feeTo = feeToUnwrapped;
            historySize = ops.size();
            deployTime = genesisUnwrapped.timestamp;
            holderNumber = balances.size();
            cycles = ExperimentalCycles.balance();
        };
    };

    public query func getHolders(start: Nat, limit: Nat) : async [(Principal, Nat)] {
        let owner = Types.unwrap<Principal>(owner_);
        let temp =  Iter.toArray(balances.entries());
        func order (a: (Principal, Nat), b: (Principal, Nat)) : Order.Order {
            return Nat.compare(b.1, a.1);
        };
        let sorted = Array.sort(temp, order);
        let limit_: Nat = if(start + limit > temp.size()) {
            temp.size() - start
        } else {
            limit
        };
        let res = Array.init<(Principal, Nat)>(limit_, (owner, 0));
        for (i in Iter.range(0, limit_ - 1)) {
            res[i] := sorted[i+start];
        };
        return Array.freeze(res);
    };

    public query func getAllowanceSize() : async Nat {
        var size : Nat = 0;
        for ((k, v) in allowances.entries()) {
            size += v.size();
        };
        return size;   
    };

    public query func getUserApprovals(who : Principal) : async [(Principal, Nat)] {
        switch (allowances.get(who)) {
            case (?allowance_who) {
                return Iter.toArray(allowance_who.entries());
            };
            case (_) {
                return [];
            };
        }
    };

    /*
    * upgrade functions
    */
    system func preupgrade() {
        let owner = Types.unwrap<Principal>(owner_);
        balanceEntries := Iter.toArray(balances.entries());
        var size : Nat = allowances.size();
        var temp : [var (Principal, [(Principal, Nat)])] = Array.init<(Principal, [(Principal, Nat)])>(size, (owner, []));
        size := 0;
        for ((k, v) in allowances.entries()) {
            temp[size] := (k, Iter.toArray(v.entries()));
            size += 1;
        };
        allowanceEntries := Array.freeze(temp);
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        balanceEntries := [];
        for ((k, v) in allowanceEntries.vals()) {
            let allowed_temp = HashMap.fromIter<Principal, Nat>(v.vals(), 1, Principal.equal, Principal.hash);
            allowances.put(k, allowed_temp);
        };
        allowanceEntries := [];
    };
};