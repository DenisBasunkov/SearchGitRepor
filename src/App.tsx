import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { MyHeader, MyFooter } from "./components/header/header"
import TablePage from "./components/TablePage/TablePage"
import { useAppSelector } from "./hooks"
import { useEffect, useState } from "react"


const App = () => {

  const { list, Error } = useAppSelector(state => state.repos)
  const [IsError, setIsError] = useState<boolean>(false)

  const AlertClose = () => {
    setIsError(false)
  }

  useEffect(() => {
    setIsError(Error !== null)
  }, [Error])

  return (
    <>
      <MyHeader />
      <Box height={"100%"} width={"100%"}>
        {
          list.length === 0 ?
            <Box height={"100%"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h3"
                style={{ textAlign: "center", justifyItems: "center", verticalAlign: "center" }}
              >Добро пожаловать</Typography>
            </Box>
            : <TablePage />
        }
      </Box>
      <MyFooter />

      <Snackbar open={IsError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={2000}
        onClose={AlertClose}
      >
        <Alert severity="error">
          {Error}
        </Alert>
      </Snackbar>

    </>
  )
}

export default App
