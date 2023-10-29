import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";
import {ImageSlider, ImageSliderItem, ImageSliderProps} from "./components/imageslider";


const IMAGES = [
    {name: "Orb Test", url:"https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg"},
    {name: "Night Test",url:"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg"}, 
    {name:"Flower Test",url:"https://images.pexels.com/photos/268534/pexels-photo-268534.jpeg"},
    {name:"Boat Test",url: "https://images.pexels.com/photos/268535/pexels-photo-268535.jpeg"}, ]

export class ImageSliderPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    private items : ImageSliderItem[] = [];

    iconColour: string ;
    defaultImage = "https://fabricweb.azureedge.net/fabric-website/placeholders/350x150.png"
    defaultImageName = "Default Image"

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

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        /*this.items = IMAGES.map((image) => {
            return {
                id: image.name,
                imageUrl: image.url,
                name: image.name
            } as ImageSliderItem;
        });*/
        const isTestHarness = context.userSettings.userId === '{00000000-0000-0000-0000-000000000000}';
        const dataset = context.parameters.items;
        const datasetChanged = context.updatedProperties.indexOf('dataset') > -1;
        
        if (datasetChanged || isTestHarness) {
          
            this.items = dataset.sortedRecordIds.map((id) => {
                const record = dataset.records[id];
                return {
                    id: record.getRecordId(),
                    imageUrl: record.getFormattedValue('ImageURL') ,
                    name: record.getValue('ImageName') as string 
                    
                } as ImageSliderItem;
            });
        }

        

        this.iconColour = context.parameters.iconColour.raw || "rgb(211,211,211)";


        
        
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

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}