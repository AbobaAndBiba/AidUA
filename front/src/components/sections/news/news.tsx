import React, {useEffect, useState} from 'react';
import classes from "./news.module.sass";
import refresh from  '../../../img/refresh.svg'
import NewsList from "./newsList";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";


const News:React.FC = () => {

  const {error, loading, limit, response, offset} = useTypedSelector(state => state.news)
  const {setNewsOffset} = useActions()

  return (
    <section className={`${classes.news} section`} id="news">
      <div className={`wrap ${classes.wrap}`}>
        <h2>Новини</h2>
        <hr/>
        <NewsList/>
        <div
          onClick={() => setNewsOffset(offset + limit)}
          className={classes.more}
        >Завантажити більше <img src={refresh} alt=""/></div>
      </div>
    </section>
  );
};

export default News;