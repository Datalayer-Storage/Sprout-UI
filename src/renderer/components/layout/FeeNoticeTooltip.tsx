import {FormattedMessage} from "react-intl";
import React from "react";
import {Tooltip} from "flowbite-react";

interface FeeNoticeTooltipProps {
  children?: React.ReactNode;
}

const FeeNoticeTooltip: React.FC<FeeNoticeTooltipProps> = ({ children }) => {
  return (
    <Tooltip content={<FormattedMessage id="this-action-will-incur-a-fee"/>}>
      {children}
    </Tooltip>
  );
};

export { FeeNoticeTooltip };
