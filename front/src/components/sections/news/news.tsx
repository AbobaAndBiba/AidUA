import React from 'react';
import classes from "../../../style/sections/news/news.module.sass";
import refresh from  '../../../img/refresh.svg'
import NewsList from "./newsList";

const News = () => {
  return (
    <section className={`${classes.news} section`}>
      <div className={`wrap ${classes.wrap}`}>
        <h2>Новини</h2>
        <hr/>
        {/*<NewsList items={}/>*/}
        <div className={classes.more}>Завантажити більше <img src={refresh} alt=""/></div>
      </div>
    </section>
  );
};

export default News;