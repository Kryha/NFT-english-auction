import { Principal } from "@dfinity/principal";

export const MAX_ADDRESS_LENGTH = 30;
export const MIN_LENGTH = 6;
export const MAX_FILE_SIZE_BYTES = 5242880;
export const NANO_IN_MILLI = 1000000;
export const FUNGIBLE_TOKEN_DECIMALS = 3;
// TODO: set to a proper value
export const DOLLARS_PER_TOKEN = 10;

export const SUPPORTED_FORMATS = "image/jpeg, image/png, .pdf";
export const MOCK_OWNER = "zzzzz-zzzzz-zzzzz-zzzzz-zzzzz-zzzzz-zzzzz-zzzzz-zzzzz-zzzzz-zzz";
export const BACK = "back";
export const LARGE_FLEXBOX_SIZE = 3;
export const MEDIUM_FLEXBOX_SIZE = 2;
export const SMALL_FLEXBOX_SIZE = 1.5;

export const BACKEND_PRINCIPAL = Principal.from(process.env.BACKEND_CANISTER_ID);
