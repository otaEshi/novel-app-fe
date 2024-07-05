import { Outlet } from "react-router";
import { useTheme } from "../../hooks/useTheme";

export function ThemeLoader() {
    useTheme();
    return <Outlet />;
}