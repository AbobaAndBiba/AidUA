import React, {FC} from 'react';
import {NewsItem} from '../../../types/news';
import classes from "./newsElement.module.sass";

interface IPropsNews{
  oneNews: NewsItem
}

const NewsElement: FC<IPropsNews> = ({oneNews}) => {

  const twoCharacterDate = (day:number) => {
    if (day.toString().length === 1) return `0${day}`
    return  day
  }

  const date = new Date(`${oneNews.createdAt}`)
  const dateOutput = `${twoCharacterDate(date.getDate())}.${twoCharacterDate(date.getMonth()+1)}.${date.getFullYear()}`


  return (
    <a href={oneNews.link} className={classes.newsItem} style={{backgroundImage: `url("${oneNews.image}")`}} target="_blank">
      <div className={classes.newsItem__wrap}>
        <div className={classes.newsItem__vertical}>
          <span className={classes.date}>{dateOutput}</span>
          <div>
            <h4>{oneNews.title}</h4>
            <p>{oneNews.text}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsElement;