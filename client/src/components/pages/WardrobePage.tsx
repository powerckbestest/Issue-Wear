import React, { useState } from 'react';
import type { DraggingStyle, DropResult, NotDraggingStyle } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../hooks/reduxHooks';

const characters = [
  {
    id: 'blackPantera',
    name: 'blackPantera',
    image: '/clothes/blackPantera.png',
  },
  {
    id: 'IVANTrouser',
    name: 'IVANTrouser',
    image: '/clothes/IVANTrouser.png',
  },
  {
    id: 'fireFlis',
    name: 'fireFlis',
    image: '/clothes/fireFlis.png',
  },
  {
    id: 'ptimarySchool',
    name: 'ptimarySchool',
    image: '/clothes/ptimarySchool.png',
  },
  {
    id: 'dayBirthday',
    name: 'dayBirthday',
    image: '/clothes/dayBirthday.png',
  },
  {
    id: 'nigthBirthday',
    name: 'nigthBirthday',
    image: '/clothes/nigthBirthday.png',
  },
  {
    id: 'IVANHoodie',
    name: 'IVANHoodie',
    image: '/clothes/IVANHoodie.png',
  },
  {
    id: 'issueLoveCat',
    name: 'issueLoveCat',
    image: '/clothes/issueLoveCat.png',
  },
  {
    id: 'moscow',
    name: 'moscow',
    image: '/clothes/moscow.png',
  },
  {
    id: 'issueWasHere',
    name: 'issueWasHere',
    image: '/clothes/issueWasHere.png',
  },
  {
    id: 'thundercloud',
    name: 'thundercloud',
    image: '/clothes/thundercloud.png',
  },
  {
    id: 'issue',
    name: 'issue',
    image: '/clothes/issue.png',
  },
  {
    id: 'fireHead',
    name: 'fireHead',
    image: '/clothes/fireHead.png',
  },
];

type Item = {
  id: string;
  content: string;
};

// fake data generator
const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  width: '70%',
  // marginTop: '40px',
  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyleLeft = (isDraggingOver: boolean): React.CSSProperties => ({
  overflow: 'scroll',
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  //   padding: grid,
  width: 470,
  maxHeight: '90vh',
  display: 'grid',
  //   gridTemplateRows: '250px 10vw 15rem',
  // flexDirection: 'column',
  // alignItems: 'center',
  gridTemplateColumns: '250px 250px',
  marginLeft: '30px',
});

const getListStyleRigth = (isDraggingOver: boolean): React.CSSProperties => ({
  // overflow: 'scroll',
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  //   padding: grid,
  width: 470,
  minHeight: '40vh',
  display: 'flex',
  //   gridTemplateRows: '250px 10vw 15rem',
  flexDirection: 'column',
  alignItems: 'center',
  gridTemplateColumns: '250px 250px',
  marginRight: '120px',
});

const getImageStyle = {
  width: '100%', // Устанавливаем 100% ширины изображения
  height: 'auto', // Автоматически рассчитываем высоту для сохранения пропорций
  //   minHeight: '50vh', //
  marginLeft: '10px',
};

export default function WardrobePage(): JSX.Element {
  const images = useAppSelector((state) => state.product.productsData.cartProducts);
  const [leftColumn, setLeftColumn] = useState<Item[]>(
    images
      .map((el) => el.ProductSize?.Product.Images.find((el) => el.forConstructor))
      .map((el) => ({ id: el?.url, name: el?.url, image: el.url })),
  );
  const [wardrobeTop, setWardrobeTop] = useState<Item[]>([]);
  const [wardrobeBottom, setWardrobeBottom] = useState<Item[]>([]);

  console.log(
    images
      .map((el) => el.ProductSize?.Product.Images.find((el) => el.forConstructor))
      .map((el) => ({ id: el?.id, name: el?.url, image: el.url })),
  );
  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.droppableId === 'leftColumn') {
        const items: Item[] = reorder(leftColumn, result.source.index, result.destination.index);
        setLeftColumn(items);
      } else if (result.source.droppableId === 'WardrobeTop') {
        const items: Item[] = reorder(wardrobeTop, result.source.index, result.destination.index);
        setWardrobeTop(items);
      } else if (result.source.droppableId === 'WardrobeBottom') {
        const items: Item[] = reorder(
          wardrobeBottom,
          result.source.index,
          result.destination.index,
        );
        setWardrobeBottom(items);
      }
    } else if (result.source.droppableId === 'leftColumn') {
      const sourceItem = leftColumn[result.source.index];
      const updatedLeftColumn = [...leftColumn];
      if (result.destination.droppableId === 'WardrobeTop') {
        const updatedWardrobeTop = [...wardrobeTop];
        updatedLeftColumn.splice(result.source.index, 1);
        // Проверяем, есть ли уже элемент в Wardrobe (Top)
        if (updatedWardrobeTop.length === 0) {
          updatedWardrobeTop.push(sourceItem);
        } else {
          // Если есть, возвращаем его в My Cart
          updatedLeftColumn.push(updatedWardrobeTop[0]);
          updatedWardrobeTop[0] = sourceItem;
        }
        setLeftColumn(updatedLeftColumn);
        setWardrobeTop(updatedWardrobeTop);
      } else if (result.destination.droppableId === 'WardrobeBottom') {
        const updatedWardrobeBottom = [...wardrobeBottom];
        updatedLeftColumn.splice(result.source.index, 1);
        // Проверяем, есть ли уже элемент в Wardrobe (Bottom)
        if (updatedWardrobeBottom.length === 0) {
          updatedWardrobeBottom.push(sourceItem);
        } else {
          // Если есть, возвращаем его в My Cart
          updatedLeftColumn.push(updatedWardrobeBottom[0]);
          updatedWardrobeBottom[0] = sourceItem;
        }
        setLeftColumn(updatedLeftColumn);
        setWardrobeBottom(updatedWardrobeBottom);
      }
    } else if (result.source.droppableId === 'WardrobeTop') {
      const sourceItem = wardrobeTop[result.source.index];
      const updatedWardrobeTop = [...wardrobeTop];
      if (result.destination.droppableId === 'leftColumn') {
        const updatedLeftColumn = [...leftColumn];
        updatedWardrobeTop.splice(result.source.index, 1);
        updatedLeftColumn.splice(result.destination.index, 0, sourceItem);
        setWardrobeTop(updatedWardrobeTop);
        setLeftColumn(updatedLeftColumn);
      } else if (result.destination.droppableId === 'WardrobeBottom') {
        const updatedWardrobeBottom = [...wardrobeBottom];
        updatedWardrobeTop.splice(result.source.index, 1);
        // Проверяем, есть ли уже элемент в Wardrobe (Bottom)
        if (updatedWardrobeBottom.length === 0) {
          updatedWardrobeBottom.push(sourceItem);
        } else {
          // Если есть, возвращаем его в My Cart
          updatedLeftColumn.push(updatedWardrobeBottom[0]);
          updatedWardrobeBottom[0] = sourceItem;
        }
        setWardrobeTop(updatedWardrobeTop);
        setWardrobeBottom(updatedWardrobeBottom);
      }
    } else if (result.source.droppableId === 'WardrobeBottom') {
      const sourceItem = wardrobeBottom[result.source.index];
      const updatedWardrobeBottom = [...wardrobeBottom];
      if (result.destination.droppableId === 'leftColumn') {
        const updatedLeftColumn = [...leftColumn];
        updatedWardrobeBottom.splice(result.source.index, 1);
        updatedLeftColumn.splice(result.destination.index, 0, sourceItem);
        setWardrobeBottom(updatedWardrobeBottom);
        setLeftColumn(updatedLeftColumn);
      } else if (result.destination.droppableId === 'WardrobeTop') {
        const updatedWardrobeTop = [...wardrobeTop];
        updatedWardrobeBottom.splice(result.source.index, 1);
        // Проверяем, есть ли уже элемент в Wardrobe (Top)
        if (updatedWardrobeTop.length === 0) {
          updatedWardrobeTop.push(sourceItem);
        } else {
          // Если есть, возвращаем его в My Cart
          updatedLeftColumn.push(updatedWardrobeTop[0]);
          updatedWardrobeTop[0] = sourceItem;
        }
        setWardrobeBottom(updatedWardrobeBottom);
        setWardrobeTop(updatedWardrobeTop);
      }
    }
  };

  return (
    <div
      style={{
        backgroundPosition: 'center',
        backgroundSize: '20%',
        backgroundRepeat: 'no-repeat',
        // backgroundImage: `url("/clothes/Logo.png")`,
        backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/57/57116.png")`,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <h2 style={{ width: '30%' }}>My Cart</h2> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Droppable droppableId="leftColumn">
            {(provided, snapshot): JSX.Element => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyleLeft(snapshot.isDraggingOver)}
              >
                {leftColumn.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot): JSX.Element => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div>
                          <img
                            src={`http://localhost:3001/images/${item.image}`}
                            alt="#"
                            style={getImageStyle}
                          />
                          {/* <div>{item.name}</div> */}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <div style={{ marginTop: '-65px' }}> */}
          <div>
            <div>
              {/* <h2>Wardrobe</h2> */}
              <Droppable droppableId="WardrobeTop">
                {(provided, snapshot): JSX.Element => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyleRigth(snapshot.isDraggingOver)}
                  >
                    {/* <h2>Wardrobe (Top)</h2> */}
                    <div style={{ marginRight: '-100px' }}>
                      {wardrobeTop.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot): JSX.Element => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              <div>
                                <img
                                  src={`http://localhost:3001/images/${item.image}`}
                                  alt="#"
                                  style={getImageStyle}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            {/* <hr /> */}
            <div style={{ marginTop: '-20px', marginLeft: '-30px' }}>
              <Droppable droppableId="WardrobeBottom">
                {(provided, snapshot): JSX.Element => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyleRigth(snapshot.isDraggingOver)}
                  >
                    {/* <h2>Wardrobe (Bottom)</h2> */}
                    {wardrobeBottom.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot): JSX.Element => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <div>
                              <img
                                src={`http://localhost:3001/images/${item.image}`}
                                alt="#"
                                style={getImageStyle}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
