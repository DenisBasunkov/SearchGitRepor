import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import { IRepos } from "../../assets/interfaces";
import React from "react";

const CardSelect = () => {
    const { Select_Id_Repor, list } = useAppSelector(state => state.repos)
    return (
        <>
            {
                Select_Id_Repor == -1 ?
                    <Box height={"100%"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Typography variant="body2" fontSize={"14px"}>
                            Выберите репозитарий
                        </Typography>
                    </Box>
                    : <DescriptionRepor item={list.find(item => item.id === Select_Id_Repor) as IRepos} />
            }
        </>
    )
}

export default CardSelect;

type TypeDescription = {
    item: IRepos
}

export const DescriptionRepor: React.FC<TypeDescription> = ({ item }) => {

    return <Stack style={{ padding: "24px" }} direction={"column"} spacing={2}>
        <Typography fontSize={"32px"}>
            {item.name}
        </Typography>
        <Stack alignItems={'end'}>
            <Chip label={item.owner.login}
                avatar={<Avatar alt={item.owner.login} src={item.owner.avatar_url} />}
                variant="outlined"
            />
        </Stack>
        <Stack direction={"row"} spacing={1} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
            {
                item.language === null ? <div></div> :
                    <Chip size="medium" label={item.language} sx={{ color: "#fff", backgroundColor: "#2196F3" }} />
            }
            <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1} >
                <img src="/Star.png" width={20} alt="" />
                {item.stargazers_count}
            </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1} display={"flex"} flexWrap={"wrap"} gap={1} >
            {
                item.topics === null ? null :
                    item.topics.map(value => {
                        return <Chip size="small" label={`${value}`} />
                    })
            }
        </Stack>
        <Typography variant="body2" fontSize={14}>
            {item.license?.name}
        </Typography>
    </Stack>

}
