import React from 'react';
import LatestProductList from './LatestProducts';

export default function MainPage(): JSX.Element {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <img style={{ width: '500px' }} src="/левыйчел.jpg" alt="issueLogo" />
        <img style={{ width: '300px', margin: '0 -40px' }} src="/star.avif" alt="star" />
        <img style={{ width: '500px' }} src="/правыйчел.jpg" alt="issueLogo" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center',border:'3px solid gray',padding:'15px',margin:'50px 250px' }}>
        <img style={{ width: '450px', marginRight: '20px' }} src="/гифкаМейн.gif" alt="gitIssue" />
        <div>
          <p style={{ marginBottom: '10px', fontSize: '18px' }}>Issue</p>
          <p>
            ISSUE появился в Москве в 2020 году. До появления бренда, команда делала футболки и продавала их с рук. Впоследствии это переосмыслилось в создание ISSUE.
            В производстве марка стремится к использованию натуральных тканей, стараясь сохранить функциональность моделей. На сегодняшний день в ассортимент входят футболки, худи, анораки и другие базовые предметы гардероба с авторскими принтами, но в планах у бренда перейти к более сложным моделям.
          </p>
        </div>
      </div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Benzin', fontSize: '50px', marginTop: '20px' }}>
        Новая коллекция
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LatestProductList showLastN={4} />
      </div>
    </>
  );
}
