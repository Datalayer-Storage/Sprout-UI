import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "flowbite-react";
import { useGetConfigQuery } from '@/api/ipc/wallet';
const AppDefault = () => {
    const [count, setCount] = useState(0);
    const { data, isLoading, isError } = useGetConfigQuery({});
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (isError)
        return _jsx("div", { children: "Error" });
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Vite + React" }), JSON.stringify(data), _jsx(Button, { children: "Click me" }), _jsxs("div", { className: "card", children: [_jsxs("button", { onClick: () => setCount((count) => count + 1), children: ["count is ", count] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to test HMR"] })] }), _jsx("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" })] }));
};
export { AppDefault };
