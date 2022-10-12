// 1. import `extendTheme` function
import { extendTheme, StyleFunctionProps, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
    config,
    fonts: {
        mono: "Menlo, monospace",
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            html: {
                scrollBehavior: "smooth",
            },
        }),
    },
    components: {
        Button: {

            variants: {
                "green-400": {
                    bg: "green.400",
                    color: "white",
                    _hover: {
                        bg: "green.500",
                    },
                    _active: {
                        bg: "green.600",
                    }
                },
                "yellow-400": {
                    bg: "yellow.400",
                    color: "white",
                    _hover: {
                        bg: "yellow.500",
                    },
                    _active: {
                        bg: "yellow.600",
                    }
                },
                "blue-800": {
                    color: "white",
                    bg: "blue.800",
                    _hover: {
                        bg: "blue.900 !important",
                    },
                    _active: {
                        bg: "blue.900",
                    },
                },
                "blue-800-outline": {
                    bg: "white",
                    color: "gray.800",
                    border: '1px solid',
                    borderColor: "gray.800",
                    _hover: {
                        bg: "blue.800",
                        color: "white",
                    },
                    _active: {
                        bg: "blue.900",
                        color: "white",
                    }
                },
                "gray-500": {
                    color: "white",
                    bg: "gray.500",
                    _hover: {
                        bg: "gray.600 !important",
                    },
                    _active: {
                        bg: "gray.600",
                    },
                },
                "blue-500": {
                    color: "white",
                    bg: "blue.500",
                    _hover: {
                        bg: "blue.600 !important",
                    },
                    _active: {
                        bg: "blue.600",
                    },
                },
                "green-500": {
                    color: "white",
                    bg: "green.500",
                    _hover: {
                        bg: "green.600 !important",
                    },
                    _active: {
                        bg: "green.600",
                    },
                },
                "red-500": {
                    color: "white",
                    bg: "red.500",
                    _hover: {
                        bg: "red.600 !important",
                    },
                    _active: {
                        bg: "red.600",
                    },
                },
            },
        },
    },
});

export default theme;
