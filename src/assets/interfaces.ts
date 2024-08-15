
export interface IRepos {// интерфейс объекта данных репозитория
    id: number, // Идентификатор
    name: string, // Название
    language: string | null,// Язык
    forks_count: number,// Число форков
    stargazers_count: number,// Число звезд
    updated_at: string,// Дата обновления репозитория
    languages_url: string,// Адрес языков
    languages?: TypeFetchRepor | null,// список языков
    license: null | {// Объект с информацией о лицензии
        key: string,// Ключ лицензии
        name: string,// Название лицензии
    },
    owner: {// Объект с описанием владельца
        id: number,// Идентификатор
        avatar_url: string,// Адрес Аватарки пользователя
        login: string,// Имя пользователя
    },
    topics: string[] | null// Массив тем
}

export type TypeReposList = {// Тип для описания слайса
    list: IRepos[],// Список репозиториев
    loading?: boolean,// Загрузка
    Error?: string | null,// Описание ошибки
    Select_Id_Repor?: number,// Идентификатор выбранного перозитория
}

export type TypeFetchRepor = {// Объект для гибкой работы с данными
    [key: string]: string | number | null,
}