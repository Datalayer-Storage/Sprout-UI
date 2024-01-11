import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import _ from 'lodash';
import { useMemo } from 'react';
import { Caption2, Caption1 } from '@/components';
import { withTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
const DataTable = withTheme(({ columns, data, isLoading = false }) => {
    const columnMap = useMemo(() => {
        return columns.reduce((map, curr) => {
            map[curr.key] = curr;
            return map;
        }, {});
    }, [columns]);
    if (isLoading) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsxs("table", { className: "min-w-full divide-y divide-gray-300 relative w-full", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: `sticky px-6 py-3 bg-gray`, style: {
                                    width: column.width,
                                    top: -1,
                                    textAlign: 'left',
                                }, children: _jsx(Caption2, { style: { textTransform: 'uppercase' }, onClick: column.onClick ? column.onClick : _.noop, children: column.renderHeader
                                        ? column.renderHeader(column)
                                        : column.title }) }, column.key))) }) }), _jsx("tbody", { className: "divide-y divide-gray-200", children: data?.length > 0 &&
                            data.map((row, index) => (_jsx("tr", { id: row.id, children: columns.map((column) => {
                                    const key = column.key;
                                    return (_jsx("td", { id: `${columnMap[key].key}-${row[key]}-${row.id}`, style: {
                                            width: columnMap[key].width,
                                            padding: columnMap[key].padding
                                                ? `${columnMap[key].padding} !important`
                                                : '30px 30px 30px 20px',
                                            ...columnMap[key].style,
                                        }, className: index === 0
                                            ? 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'
                                            : 'whitespace-nowrap px-3 py-4 text-sm text-gray-500', children: _jsx(Caption1, { children: columnMap[key].render
                                                ? columnMap[key].render(row)
                                                : row[key] }) }, `${columnMap[key].key}-${row[key]}-${row.id}`));
                                }) }, row.id))) })] }), data?.length === 0 && (_jsx("div", { style: {
                    padding: 15,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }, children: _jsx(FormattedMessage, { id: "empty-table" }) }))] }));
});
export { DataTable };
