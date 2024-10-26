import { type FC } from "react";

import LeftArrow from "~/assets/icons/left-arrow.svg?react";
import LeftDoubleArrow from "~/assets/icons/left-double-arrow.svg?react";
import RightArrow from "~/assets/icons/right-arrow.svg?react";
import RightDoubleArrow from "~/assets/icons/right-double-arrow.svg?react";

import { type IconName } from "../types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
  leftArrow: LeftArrow,
  leftDoubleArrow: LeftDoubleArrow,
  rightArrow: RightArrow,
  rightDoubleArrow: RightDoubleArrow,
};

export { iconNameToSvg };
