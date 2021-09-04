import Card from '@/components/UI/Card/Card';
import { API_ENDPOINT_URL } from '@/constants';
import React, { useEffect, useState } from 'react';
import MealItem from './../MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMealList = async () => {
      const response = await fetch(API_ENDPOINT_URL + 'meals.json');

      if (!response.ok) {
        throw new Error('Fetch meals list errors');
      }

      const data = await response.json();
      const mealLst = [];
      for (const key in data) {
        mealLst.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(mealLst);
    };

    fetchMealList();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
