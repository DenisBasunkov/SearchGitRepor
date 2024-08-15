import React from "react"
import { useAppSelector } from "../../hooks"
import { Backdrop, CircularProgress, Typography } from "@mui/material"
import TableRepor from "./Table"
import stiles from "./TablePage.module.scss"
import CardSelect from "../CardSelect/CardSelect"


const TablePage: React.FC = () => {

    const { loading } = useAppSelector(state => state.repos)

    return (
        <>
            {
                loading ? <Backdrop open={loading}
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <CircularProgress size={50} />
                </Backdrop > :
                    <div className={stiles.container}>
                        <div className={stiles.main_table} >
                            <Typography variant="h3">
                                Результаты поиска
                            </Typography>
                            <TableRepor />
                        </div>
                        <div className={stiles.Card_Description}>
                            <CardSelect />
                        </div>
                    </div>
            }
        </>
    )
}
export default TablePage