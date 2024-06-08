import { useToast, extendTheme, ChakraProvider } from "@chakra-ui/react";

let _toast;

export function showToast(content) {
  console.log(content);
  _toast(content);
}

export default function Root(props) {
  _toast = useToast();

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          fontFamily: "Quicksand, sans-serif",
        }
      }
    }});

  return (
    <ChakraProvider theme={theme}>
      <div style={{
        position: 'fixed', zIndex: '1000'
      }}></div>
    </ChakraProvider>
  );
}
