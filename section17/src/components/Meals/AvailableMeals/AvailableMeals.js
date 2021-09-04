import Card from '@/components/UI/Card/Card';
import useHttp from '@/hooks/use-http';
import React, { useEffect, useState } from 'react';
import MealItem from './../MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (meals) => {
      const loadedTasks = [];

      for (const key in meals) {
        loadedTasks.push({
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        });
      }

      setMeals(loadedTasks);
    };

    fetchTasks({ url: 'meals.json' }, transformTasks);
  }, [fetchTasks]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const mealContents = error && <p>{error}</p>;
  const loadingContent = <p>Data loading...</p>;

  return (
    <section className={classes.meals}>
      <Card>
        {mealContents}
        {!isLoading && <ul>{mealsList}</ul>}
        {isLoading && loadingContent}
      </Card>
    </section>
  );
};

export default AvailableMeals;
