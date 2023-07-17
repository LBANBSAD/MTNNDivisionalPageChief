import * as React from 'react';
import "../components/global.scss";
import styles from '../components/MtnnDivisionalPageCfo.module.scss'
import { IMtnnDivisionalPageCfoProps } from './IMtnnDivisionalPageCfoProps';
import { sp } from "@pnp/sp";
import * as jQuery from "jquery";

export default class MtnnDivisionalPageCfo extends React.Component<IMtnnDivisionalPageCfoProps, any> {

  public constructor(props: IMtnnDivisionalPageCfoProps, any) {

    super(props);

    this.state = {

      CFOWebPart: [],

    };

  }

  public render(): React.ReactElement<IMtnnDivisionalPageCfoProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <div className={styles.mainContainer}>
        <div className={styles.Container}>
          {this.state.chiefWebPart?.map((item, i) => (
            <div className={styles.Picture} key={i} style={{
             background: `url(${item?.Pictures})`,backgroundPosition: "center",backgroundSize: "cover"
              }}>
              <div>
                <h4>{item?.Title}</h4>
                <h5>{item?.Role}</h5>
              </div>
            </div>
            ))}
        </div>
        {this.state.chiefWebPart?.map((item, i) => (
          <div className={styles.contentRight} key={i}>
            <h3>{item?.Header}</h3>
            <p>{item?.Content}</p>
          </div>
          ))}
      </div>
    );
  }

  public componentDidMount() {

    

    this._getAnniversary();

  }private _getAnniversary(): void {

    sp.web.lists

      .getByTitle(`chiefWebPart`)

      .items.get()

      .then((res) => {

        this.setState({ chiefPart: res });

      });

  }
}
