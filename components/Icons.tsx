import React from "react";

import AccountIcon from "@/assets/icons/account.svg";
import BellIcon from "@/assets/icons/bell.svg";
import EditIcon from "@/assets/icons/edit.svg";
import HelpIcon from "@/assets/icons/help.svg";
import InfoIcon from "@/assets/icons/info.svg";
import PlayIcon from "@/assets/icons/play.svg";
import SearchIcon from "@/assets/icons/search.svg";
import TransferIcon from "@/assets/icons/transfer.svg";

const iconMap = {
  account: AccountIcon,
  bell: BellIcon,
  edit: EditIcon,
  help: HelpIcon,
  info: InfoIcon,
  play: PlayIcon,
  search: SearchIcon,
  transfer: TransferIcon,
};

type IconProps = {
  name: keyof typeof iconMap; // Restricts to valid icon names
  className?: string;
};

function Icon({ name, className = "" }: IconProps) {
  // Dynamically select the icon component based on the name prop
  const SelectedIcon = iconMap[name];
  if (!SelectedIcon) {
    return null; // Render nothing if the icon name is invalid
  }
  return <SelectedIcon className={className} />;
}

export default Icon;
