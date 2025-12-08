import React from 'react';
import Banner from '../Banner/Banner';
import MealsSection from '../MealsSection/MealsSection';
import Reviews from '../Reviews/Reviews';
import Service from '../Service/Service';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner> </Banner>
            <MealsSection> </MealsSection>
            <Reviews reviewsPromise={reviewsPromise}> </Reviews>
            <Service> </Service>
        </div>
    );
};

export default Home;