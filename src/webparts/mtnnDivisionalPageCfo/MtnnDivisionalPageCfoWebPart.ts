import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MtnnDivisionalPageCfoWebPartStrings';
import MtnnDivisionalPageCfo from './components/MtnnDivisionalPageCfo';
import { IMtnnDivisionalPageCfoProps } from './components/IMtnnDivisionalPageCfoProps';
import { sp } from "@pnp/sp/presets/all";

export interface IMtnnDivisionalPageCfoWebPartProps {
  description: string;
}

export default class MtnnDivisionalPageCfoWebPart extends BaseClientSideWebPart<IMtnnDivisionalPageCfoWebPartProps> {

  public onInit(): Promise<void> {

    sp.setup({

      spfxContext: this.context,

    });

    return Promise.resolve();

  }

  public render(): void {
    const element: React.ReactElement<IMtnnDivisionalPageCfoProps> = React.createElement(
      MtnnDivisionalPageCfo,
      {
        description: this.properties.description,
        context: this.context,
        pageContext: this.context.pageContext,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
