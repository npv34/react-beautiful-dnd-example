import {useCallback, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import List from "../List/List";

let data = [
    {
        id: 1,
        title: "Backlog",
        subTasks: [
            {
                id: 1,
                title: "Task 1",
            },
            {
                id: 2,
                title: "Task 2",
            }
        ]
    },
    {
        id: 2,
        title: "Todo",
        subTasks: [

        ]
    },
    {
        id: 3,
        title: "Doing",
        subTasks: []
    },
    {
        id: 4,
        title: "Done",
        subTasks: []
    }
]
const grid = 2;
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});


function reorder(result, lists) {
    let indexDestination = result.destination.index;
    let indexSource = result.source.index;
    let itemDestination = lists[indexDestination];
    lists[indexDestination] = lists[indexSource];
    lists[indexSource] = itemDestination;
    return lists
}

function Board() {
    const [lists, setLists] = useState(data)

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
        if (!result.destination) {
            return;
        }
        const items = reorder(result, lists);
        setLists([...items]);
    }, []);

    return (
        <>
            <DragDropContext
                onBeforeCapture={onBeforeCapture}
                onBeforeDragStart={onBeforeDragStart}
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}

            >
                <Droppable droppableId="droppable-1" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {lists.map((item, index) => (
                                <Draggable key={index} draggableId={'list-' + index} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <List item={item} index={index}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default Board;