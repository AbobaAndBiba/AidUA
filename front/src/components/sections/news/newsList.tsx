import React, {useEffect} from 'react';
import {NewsItem} from '../../../types/news';
import NewsElement from "./newsElement";
import classes from "./newsList.module.sass";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {fetchNews} from "../../../store/action-creators/news";
import {useActions} from "../../../hooks/useActions";


const NewsList:React.FC = () => {
  const {error, loading, limit, response, offset} = useTypedSelector(state => state.news)
  const {fetchNews} = useActions()


  useEffect(() => {
    fetchNews(offset, limit)
  }, [offset])

  if (loading) return <h3>Loading...</h3>
  if (error) return <h3>{error}</h3>

  if (response.news){
    return (
      <div className={classes.newsList}>
        {response.news.map((oneNews: NewsItem) =>
          <NewsElement oneNews={oneNews} key={oneNews.id}/>
        )}
      </div>
    );
  }
  return (<div></div>)
};

export default NewsList;