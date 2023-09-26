import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import React from 'react';
import ymaps from 'yandex-maps';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ float: 'left', }}>
        <p><b>Наши контакты:</b></p>
        <p>mail : issuewear@gmail.com</p>
        <p>telegram : @issue_wear</p>
        <p>direct : issue_wear</p>
      </div>
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
    </footer>
  );
}
