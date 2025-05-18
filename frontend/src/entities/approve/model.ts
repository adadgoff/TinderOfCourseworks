/* 
    Cw <=> Coursework.    
    St <=> Student.
    Sv <=> Supervisor.
 */

export class StCwApprove {
  constructor(
    public readonly id: string,
    public readonly stCwId: string,
    public readonly stId: string,
    public readonly svId: string,
    public readonly datetime: Date,
  ) {}
}

export class SvCwApprove {
  constructor(
    public readonly id: string,
    public readonly svCwId: string,
    public readonly stId: string,
    public readonly svId: string,
    public readonly datetime: Date,
  ) {}
}
