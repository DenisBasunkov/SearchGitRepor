import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@mui/material"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks";
import stiles from "./TablePage.module.scss"
import { IRepos } from "../../assets/interfaces";
import { Select_data_list } from "../../store/GitRepoSlice";
import * as _ from "lodash"

interface IRepo { // Интерфейс пропсов для строки данных
    item: IRepos, // Данные репозитория
    isId: number,
    setIsId: React.Dispatch<React.SetStateAction<number>>,

}
export const CustomRows: React.FC<IRepo> = ({ item, isId, setIsId }) => {

    const dispatch = useAppDispatch()

    return (
        <TableRow key={item.id}
            hover onClick={() => { setIsId(item.id); dispatch(Select_data_list(item.id)) }}
            selected={item.id === isId}
            sx={{ height: 48 }}
        >
            <TableCell colSpan={1}>{item.name}</TableCell>
            <TableCell colSpan={1}>{item.language}</TableCell>
            <TableCell colSpan={1}>{item.forks_count}</TableCell>
            <TableCell colSpan={1}>{item.stargazers_count}</TableCell>
            <TableCell colSpan={1}>{new Date(item.updated_at).toLocaleDateString("en-GB").split("/").join(".")}</TableCell>
        </TableRow>
    )
}

type TypeData = IRepos[] //

type TypeOrderCell = { //
    label: string;
    value: string;
}

const TableRepor: React.FC = () => {

    const { list, Error } = useAppSelector(state => state.repos)

    const [isId, setIsId] = useState<number>(0) // Состояне идентификатора выбранного репозитория


    const OrderCell: TypeOrderCell[] = [// Список объектов с описанием столбцов для сортировки данных
        { label: "Число форков", value: "forks_count" },
        { label: "Число звезд", value: "stargazers_count" },
        { label: "Дата обновления", value: "updated_at" }
    ];
    const [IsOreder, setIsOreder] = useState<'asc' | 'desc'>("asc")// Состояние направления сортировки
    const [isActiveCell, setIsActiveCell] = useState<string>("")// Состояние активного столбца сортировки
    const [dataList, setData] = useState<TypeData>(list)// Состояние отсортированного списка репозиториев

    const [currentPage, setCurrentPage] = useState<number>(0)// Состояние текущей страницы 
    const [postPerPage, setPostPerPage] = useState<number>(10);// Состояние колличества постов на странице
    const firstPostIndex = currentPage * postPerPage;
    const lastPointIndex = firstPostIndex + postPerPage;
    const currentData = dataList.slice(firstPostIndex, lastPointIndex); // Срезанный список репозиториев

    // Функция сортировки данных по выбранному столбцу
    const OrderByCell = (e: string) => {
        setIsActiveCell(e);
        if (IsOreder == 'asc') {
            setIsOreder("desc")
        } else {
            setIsOreder("asc")
        }
        setData(_.orderBy(list, e, IsOreder))
    }

    return (
        <Box width={"100%"} height={"100%"}>
            <TableContainer className={stiles.Table_container}>
                <Table stickyHeader size="small" style={{ height: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Язык</TableCell>
                            {
                                OrderCell.map(value => {
                                    return <TableCell key={value.label}>
                                        <TableSortLabel
                                            active={value.value === isActiveCell}
                                            onClick={() => OrderByCell(value.value)}
                                            direction={IsOreder}
                                        >
                                            {value.label}
                                        </TableSortLabel>
                                    </TableCell>
                                })
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody component={"tbody"} style={{
                        maxHeight: "500px",
                        overflowY: "auto",
                    }}>

                        {
                            Error !== null ?
                                <TableRow sx={{ width: "100%" }}>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h4">
                                            Данных по вашему запросу не найдено
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                : <>
                                    {
                                        currentData.map(item => {
                                            return <CustomRows key={item.id} item={item} isId={isId} setIsId={setIsId} />
                                        })
                                    }
                                    {
                                        currentData.length < postPerPage && Array.from(Array(postPerPage - currentData.length)).map((_, index) => {
                                            return <TableRow key={`empty-${index}`} style={{ height: 48 }}>
                                                <TableCell colSpan={5} />
                                            </TableRow>
                                        })
                                    }
                                </>
                        }
                    </TableBody>

                </Table>
            </TableContainer >

            <TablePagination
                style={{ width: "100%" }}
                component={"div"}
                page={currentPage}
                onPageChange={(_, n) => setCurrentPage(n)}
                rowsPerPage={postPerPage}
                count={list.length}
                rowsPerPageOptions={[10, 20, 30]}
                onRowsPerPageChange={(e) => { setPostPerPage(+e.target.value); setCurrentPage(0) }}
            />
        </Box>
    )
}
export default TableRepor
