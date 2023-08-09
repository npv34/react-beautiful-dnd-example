import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import { Card, CardContent, Typography} from "@mui/material";
import Task from "../Task/Task";
import {useCallback} from "react";

function List({item,index}) {
    const onBeforeCapture = useCallback(() => {
        console.log(1)
    }, []);
    const onBeforeDragStart = useCallback(() => {
        console.log(2)
    }, []);
    const onDragStart = useCallback(() => {
        console.log(3)
    }, []);
    const onDragUpdate = useCallback((result) => {

    }, []);
    const onDragEnd = useCallback((result) => {
        console.log(result)
    }, []);


    return (
        <>
            <Card sx={{ width: 200, margin: 2, minHeight: 400 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.title}
                        <DragDropContext
                            onBeforeCapture={onBeforeCapture}
                            onBeforeDragStart={onBeforeDragStart}
                            onDragStart={onDragStart}
                            onDragUpdate={onDragUpdate}
                            onDragEnd={onDragEnd}
                        >
                            <Droppable droppableId={index.toString()}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {item.subTasks.map((task, index) => (
                                            <Draggable key={index} draggableId={'current-list-' + index} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Task item={task} index={index}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}

                            </Droppable>
                        </DragDropContext>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default List;