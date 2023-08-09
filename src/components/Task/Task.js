import {Card, CardContent, Typography} from "@mui/material";

function Task({item,index}) {
    return (
        <>
            <Card sx={{ marginTop: 1,  backgroundColor: "#D8D9DA"}}>
                <CardContent>
                    <Typography variant="body2">
                        {item.title}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Task;