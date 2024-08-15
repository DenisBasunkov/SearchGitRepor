import React, { useState } from "react"
import stiles from "./header.module.scss"
import { useAppDispatch } from "../../hooks"
import { FetchGitRepor } from "../../store/GitRepoSlice"
import { Button, IconButton, Input, InputAdornment } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

export const MyHeader = () => {

    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>('') // Состояние с названием репозитория

    // Функция записи в состояние из Input
    const TextOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value)
    }

    // Функция выполнения запроса на поиск репозиториев
    const AddToRedux = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        dispatch(FetchGitRepor(text))
    }

    // Функция очистки Input и состояния
    const ClearInput = (): void => {
        setText("")
    }

    return <header className={stiles.header}>

        <form className={stiles.Form_Search} onSubmit={AddToRedux}>
            <Input placeholder="Введите поисковый запрос" value={text} onChange={TextOnChange} className={stiles.User_input}
                endAdornment={text !== "" ? <InputAdornment position="end">
                    <IconButton onClick={ClearInput}>
                        <CloseIcon />
                    </IconButton>
                </InputAdornment> : null}
            />
            <Button variant="contained" type="submit" className={stiles.btn_search}>Искать</Button>
        </form>

    </header>

}


export const MyFooter = () => {

    return <footer className={stiles.footer}>
    </footer>

}