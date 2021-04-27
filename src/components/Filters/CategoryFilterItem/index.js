import React from 'react';
import { CategoryFilterItemWrapper } from './styles';
import { Checkbox } from 'components';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export function CategoryFilterItem({ title, collectionId }) {
  // Ex. search : ?c=Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2NTEzOTk3ODQzMA%3D%3D
  const { search } = useLocation();

  // Ex. qs: {c: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2NTEzOTk3ODQzMA=="}
  const qs = queryString.parse(search);

  // Split the query params(ids) by excluding any potential empty spaces
  const queryStringIds = qs.c?.split(',').filter(c => !!c) || [];

  // check if the collection is already checked
  const alreadySelected = queryStringIds?.find(qsId => qsId === collectionId);

  const onClick = () => {
    let navigateTo = '/all-products';

    let newIds = [];

    if (alreadySelected) {
      // if the collection is already selected, then the click is for unchecking the item. Simply update newIds with queryStringIds by excluding the unchecked collection
      newIds = queryStringIds
        .filter(checkedId => checkedId !== collectionId)
        .map(checkedId => encodeURIComponent(checkedId));
    } else {
      // if the collection is newly checked, append it to the existing queryStringIds and update newIds
      queryStringIds.push(collectionId);
      newIds = queryStringIds.map(checkedId => encodeURIComponent(checkedId));
    }

    if (newIds.length) {
      navigate(`${navigateTo}?c=${newIds.join(',')}`);
    } else {
      navigate(`${navigateTo}`);
    }
  };

  return (
    <CategoryFilterItemWrapper onClick={onClick}>
      <Checkbox checked={alreadySelected} />
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
}
