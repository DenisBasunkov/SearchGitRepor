import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { IRepos, TypeFetchRepor, TypeReposList } from "../assets/interfaces"
import axios from "axios"

const Rate = (Objects: TypeFetchRepor): TypeFetchRepor => { //Функция распределения процентного соотношения используемых языков

    let Sum: number = 0;
    if (Objects !== null) {
        Object.keys(Objects).forEach((items) => {
            Sum = Sum + (Objects[items] as number);
        })
        const result: TypeFetchRepor = {};
        Object.keys(Objects).forEach((items) => {
            result[items] = (Objects[items] as number / Sum * 100).toFixed(2)
        })
        return result;
    }
    return {}
}


// Функция поиска репозиториев по названию
export const FetchGitRepor = createAsyncThunk<IRepos[], string, { rejectValue: string }>(
    'GitRepo/FetchGitRepor',
    async function (Name, { rejectWithValue }) {
        try {
            // Выполнение GET запроса на поиск репозиториев по названию
            const result = await axios.get("https://api.github.com/search/repositories", {
                params: {
                    q: Name
                }
            })
            // Проверка на ошибку выполнения запроса
            if (result.status !== 200) {
                return rejectWithValue("Not Found")
            }
            //Запись списка репозиториев с выполнением запроса на соотношение использования языков 
            const data: IRepos[] = await Promise.all(
                result.data.items.map(async (item: IRepos) => {
                    let languages = null;
                    try {
                        // запрос на вывод соотношения использованных языков
                        const languageResult = await axios.get(item.languages_url);
                        languages = Rate(languageResult.data);
                    } catch (languageErr) {
                        languages = null
                        console.error(`Failed to fetch languages for repo ${item.name}:`, languageErr);
                    }

                    return {
                        id: item.id,
                        name: item.name,
                        language: item.language,
                        forks_count: item.forks_count,
                        stargazers_count: item.stargazers_count,
                        updated_at: item.updated_at,
                        license: item.license,
                        languages: languages,
                        owner: item.owner,
                        topics: item.topics,
                    }
                })
            )
            return data
        } catch (err) {
            return rejectWithValue("Not Found")
        }
    }
)



const initialState: TypeReposList = {// Данные по умолчанию в слайсе
    list: [],
    loading: false,
    Error: null,
    Select_Id_Repor: -1,
}

const GitRepoSlice = createSlice({
    name: "GitRepo",
    initialState,
    reducers: {
        Select_data_list(state, action): void {//Функция выбора идентификатора из списка
            state.Select_Id_Repor = action.payload
        },
        removeAll(state): void { // Функция очистки списка
            state.list = [];
            state.Error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchGitRepor.pending, (state) => {
                state.loading = true;
                state.Error = null;
                state.Select_Id_Repor = -1;
            })
            .addCase(FetchGitRepor.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.Error = action.payload;
                state.loading = false;
                state.Select_Id_Repor = -1;
            })
    }
})

export const { removeAll, Select_data_list } = GitRepoSlice.actions;

export default GitRepoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith("rejected")
}