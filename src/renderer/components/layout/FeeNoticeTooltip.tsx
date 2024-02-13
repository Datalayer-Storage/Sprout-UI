import {FormattedMessage} from "react-intl";
import React, {PropsWithChildren} from "react";
import {Tooltip} from "flowbite-react";


const FeeNoticeTooltip: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tooltip content={<FormattedMessage id="this-action-will-incur-a-fee"/>}>
      {children}
    </Tooltip>
  );
};

export { FeeNoticeTooltip };
