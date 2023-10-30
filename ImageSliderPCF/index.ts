import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import {ImageSlider, ImageSliderItem, ImageSliderProps} from "./components/imageslider";
import { inputProperties } from "@fluentui/react";




export class ImageSliderPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    private items : ImageSliderItem[] = [ ];

    iconColour: string ;
    

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        this.context.mode.trackContainerResize(true);
    }

    
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
        const isTestHarness = context.userSettings.userId === '{00000000-0000-0000-0000-000000000000}';
        const dataset = context.parameters.items;
        const datasetChanged = context.updatedProperties.indexOf('dataset') > -1;
        if (datasetChanged || isTestHarness) {
          
            this.items = dataset.sortedRecordIds.map((id) => {
                const record = dataset.records[id];
                return {
                    id: record.getRecordId(),
                    imageUrl: record.getValue('ImageURL') as string ,
                    name: record.getValue('ImageName') as string 
                    
                } as ImageSliderItem;
            });
        }

        

        this.iconColour = context.parameters.iconColour.raw || "rgb(25,255,255)";


        
        
        const allocatedWidth = parseInt(context.mode.allocatedWidth as unknown as string);

        return React.createElement(
            ImageSlider,
            {
                imageUrls: this.items,
                width: allocatedWidth,
                iconColour: this.iconColour
            } as ImageSliderProps
        );
        
    }

    
    public getOutputs(): IOutputs {
        return { };
    }

   
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
