import React, {FC} from 'react';
import {INewsItem} from "../../../types";
import NewsItem from "./newsItem";

interface INewsList{
  items: INewsItem[]
}

const NewsList: FC<INewsList> = ({items}) => {
  return (
    <div>
      {/*{items.map((item) => */}
      {/*  <NewsItem item={item} key={item.id}>*/}
      {/*)}*/}
    </div>
  );
};

export default NewsList;