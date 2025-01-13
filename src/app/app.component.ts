import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { IPoint } from '@foblex/2d';
import {
  EFConnectableSide,
  EFMarkerType,
  FCanvasComponent,
  FCreateConnectionEvent,
  FCreateNodeEvent,
  FReassignConnectionEvent,
} from '@foblex/flow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;

  public connections: { from: string; to: string }[] = [];
  public isConnectionFromOutlet: boolean = false;
  public nodes: Array<any> = [];
  private nodeCounter: number = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }

  public addNode(event: FCreateNodeEvent): void {
    this.nodeCounter++;
    const newNode = {
      id: `node-${this.nodeCounter}`,
      name: event.data,
      position: {
        x: event.rect?.gravityCenter.x,
        y: event.rect?.gravityCenter.y,
      },
      outputs: [
        { id: `output-${this.nodeCounter}-1`, class: 'top-right' },
        { id: `output-${this.nodeCounter}-2`, class: 'right' },
        { id: `output-${this.nodeCounter}-3`, class: 'bottom-right' },
        { id: `output-${this.nodeCounter}-4`, class: 'bottom-left' },
      ],
      inputs: [
        {
          id: `input-${this.nodeCounter}-1`,
          connectedTo: '',
          class: 'bottom-left',
        },
        {
          id: `input-${this.nodeCounter}-2`,
          connectedTo: '',
          class: 'bottom-right',
        },
        {
          id: `input-${this.nodeCounter}-3`,
          connectedTo: '',
          class: 'top-left',
        },
        {
          id: `input-${this.nodeCounter}-4`,
          connectedTo: '',
          class: 'top-right',
        },
      ],
    };

    this.nodes.push(newNode);
    // console.log('nodes', this.nodes);
    // console.log('connections', this.connections);

    this.changeDetectorRef.detectChanges();
  }

  public onCreateConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }

    this.isConnectionFromOutlet = !this.isConnectionFromOutlet;

    this.connections.push({ from: event.fOutputId, to: event.fInputId });
    this.onConnectionFromOutletChange(this.isConnectionFromOutlet);
    this.changeDetectorRef.detectChanges();
  }

  public onDeleteConnections(): void {
    this.connections = [];
    this.changeDetectorRef.detectChanges();
  }

  public onConnectionFromOutletChange(val: any): void {
    this.isConnectionFromOutlet = val;
  }

  reassignConnection(event: FReassignConnectionEvent): void {
    if (!event.newFInputId) {
      return;
    }
    this.connections.map((val: any) => {
      if (val.from == event.fOutputId) {
        val.to = event.newFInputId;
      }
      return val;
    });

    this.changeDetectorRef.detectChanges();
  }

  onNodeAdded(event: FCreateNodeEvent): void {
    this.addNode(event);
  }

  onNodePositionChanged(point: IPoint, node: any): void {
    node.position = point;
  }

  // (click)="getCurrentLineClicked(connection)" Html use
  getCurrentLineClicked(connection: { from: string; to: string }) {
    const { from, to } = connection;
    this.connections = this.connections.filter((val) => {
      return val.from != from && val.to != to;
    });
    this.changeDetectorRef.detectChanges();
  }
}
