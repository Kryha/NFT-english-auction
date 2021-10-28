import styled from "styled-components";
import { fontSize, fontWeight, margins } from "../../design-system";

export const Title = styled.h1`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.heading};
  line-height: ${margins.big};
`;

export const SubTitle = styled.h2`
  font-weight:  ${fontWeight.bold};
  font-size: ${fontSize.subHeading}
  line-height: 47px;
`;

export const Heading = styled.h1`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.large};
  line-height: 35px;
`;

export const CardHeading = styled.h3`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.large};
  line-height: 35px;
`;

export const SubHeading = styled.h2`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.medium};
  line-height: 28px;
`;

export const Label = styled.h4`
  font-size: ${fontSize.subtitle};
  text-transform: uppercase;
`;

export const SidebarHeading = styled.h3`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.large};
  line-height: 26px;
`;

export const TableText = styled.h3`
  font-weight: ${fontWeight.light};
  font-size: 22px;
  line-height: 26px;
`;

export const GeneralText = styled.p`
  font-weight: ${fontWeight.light};
  font-size: 20px;
  line-height: 23px;
`;
