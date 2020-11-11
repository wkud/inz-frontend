import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { CategoryContext } from '../../context/CategoryContext';
import Category from '../model_items/Category'
import ModelListHeader from '../common-for-models/ModelListHeader';

const CategoryList = () => {
  const category = useContext(CategoryContext);

  const getCategories = () => {
    if (category.list.length === 0) category.getAll();
  };
  useEffect(() => getCategories());

  const syncCategories = () => {
    category.clearFlags(); //force try again
    category.getAll();
  };


  const noItemsCaption = () =>
  category.loading
      ? 'Loading...'
      : category.errorMessage
      ? 'Cannot load category list due to an error'
      : 'There are no items to be displayed';

  return (
    <div className='d-flex flex-column align-items-center'>
      <ModelListHeader syncAction={syncCategories} headerCaption='Categories' />
      <ListGroup className='model-view scroll'>
        <div className='p-0'>
          {category.list.length === 0 ? (
            <ListGroup.Item>{noItemsCaption()}</ListGroup.Item>
          ) : (
            category.list.map((category) => (
              <Category category={category} key={category.id} />
            ))
          )}
        </div>
      </ListGroup>
      {/* <Button className='text-center model-view' href='#category/form'>
        Add new category
      </Button> */}
    </div>
  );
};

export default CategoryList;
