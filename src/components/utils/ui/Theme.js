import { createTheme } from '@mui/material/styles';

const arcBlue = "#0b72B9"
const arcOrange = "#FFBA60"

const theme = createTheme({
    palette:{
        common:{
            blue: `${arcBlue}`,
            orange:`${arcOrange}` 
        },
        primary : {
            main: `${arcBlue}`
        },
        secondary : {
            main : `${arcOrange}`
        }
    },
    typography:{
        h3:{
            fontWeight: 300
        }
    },
    components: {
        MuiPaper: {
            styleOverrides:{
                outlined: {
                    padding: 20
                }
            }
        },
        MuiCard:{
            styleOverrides:{
                root: {
                    padding: 20
                }
            }
        },
        MuiButton:{
            styleOverrides:{
                contained: {
                    height: 50,
                    maxWidth:'400px',
                    marginTop:20

                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    width:'100%',
                }
            }
        }
    }
})

export default theme;