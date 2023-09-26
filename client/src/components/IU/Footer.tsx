import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import React from 'react';
import ymaps from 'yandex-maps';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ float: 'right' }}>
          <YMaps>
            <div>
              <Map
                defaultState={{
                  center: [55.758453, 37.631514],
                  zoom: 15,
                }}
              >
                <Placemark geometry={[55.758453, 37.631514]} />
              </Map>
            </div>
          </YMaps>
        </div>
      </div>
      <div className="footer-bottom">
        По всем появившимся вопросам и предложениям смело пишите на нашу
        <p>почту : issuewear@gmail.com</p>
        <p>в тг : @issue_wear</p>
        <p>директ : issue_wear</p>
      </div>
    </footer>
  );
}
