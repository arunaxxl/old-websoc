import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable()
export class WebSocketService {

constructor(private socket: Socket) {
  this.startIdleState();
  this.getPieChartData();
  this.getradarChartData();
  this.getbarChartData();
  this.getTablelData();
  // this.getlineChartData();
  // this.getmultipleChartData();
}

    public alaramIcon$ = new Subject();
    public pieChart$ = new Subject();
    public radarChart$ = new Subject();
    public barChart$ = new Subject();
    public lineChart$ = new Subject();
    public mulitpleChart$ = new Subject();
    public tblData$ = new Subject();

    alaramIconColorChange(value) {
      this.alaramIcon$.next(value);
    }

    checkIdleState(id: string) {
      this.socket.emit('idle', id);
    }

    startIdleState(){
      this.socket.on('idlestate', (state) => {
      this.alaramIconColorChange(state);
    })
    }

    getPieChart(){
      this.socket.emit('getpiechart');
    }

    getPieChartData(){
      this.socket.on('piechart', (state) => {
      this.pieChart$.next(state);
    })
    }

    getRadarChart(){
      this.socket.emit('getradarchart');
    }

    getradarChartData(){
      this.socket.on('radarchart', (state) => {
      this.radarChart$.next(state);
    })
    }

    getBarChart(){
      this.socket.emit('getbarchart');
    }

    getbarChartData(){
      this.socket.on('barchart', (state) => {
      this.barChart$.next(state);
    })
    }

    getTblData(){
      this.socket.emit('gettabledata');
    }

    getTablelData(){
      this.socket.on('tbldata', (state) => {
      this.tblData$.next(state);
    })
    }


    // getLineChart(){
    //   this.socket.emit('getlinechart');
    // }

    // getlineChartData(){
    //   this.socket.on('linechart', (state) => {
    //   this.lineChart$.next(state);
    // })
    // }

    // getMultipleChart(){
    //   this.socket.emit('getmulitiplechart');
    // }

    // getmultipleChartData(){
    //   this.socket.on('multiplechart', (state) => {
    //   this.mulitpleChart$.next(state);
    // })
    // }


}
