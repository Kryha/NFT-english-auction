import styled from "styled-components";
import { color, fontSize, fontWeight, margins } from "../../design-system";

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.heading};
  line-height: ${margins.big};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const SubTitle = styled.h2`
  font-weight:  ${fontWeight.bold};
  font-size: ${fontSize.subHeading}
  line-height: 47px;
  margin-bottom: ${margins.medium};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading = styled.h1`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.large};
  line-height: 35px;
  :first-letter {
    text-transform: capitalize;
  }
`;

export const CardHeading = styled.h3`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.large};
  line-height: 35px;
  :first-letter {
    text-transform: capitalize;
  }
`;

export const SubHeading = styled.h2`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.medium};
  line-height: 28px;
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Label = styled.h4`
  font-size: ${fontSize.subtitle};
  text-transform: uppercase;
`;

export const SidebarHeading = styled.h3`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.large};
  line-height: 26px;
  :first-letter {
    text-transform: capitalize;
  }
`;

export const TableText = styled.h3`
  font-weight: ${fontWeight.light};
  font-size: 22px;
  line-height: 26px;
  margin-top: ${margins.mini};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const GeneralText = styled.p`
  font-weight: ${fontWeight.light};
  font-size: 20px;
  line-height: 23px;
  :first-letter {
    text-transform: capitalize;
  }
`;

export const WarningText = styled(TableText)`
  color: ${color.orange};
  font-size: 15px;
  :first-letter {
    text-transform: capitalize;
  }
`;
