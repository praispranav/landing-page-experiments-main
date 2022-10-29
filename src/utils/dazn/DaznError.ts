interface DaznErrorParams extends Error {
  readonly category: string | number;
  readonly code: string | number;
  readonly httpStatus: number;
}

export class DaznError extends Error {

    public readonly category: string;
    public readonly code: string;
    public readonly httpStatus: number;

    public get errorCode(): string {
      return [
        this.category,
        this.code,
        this.errorCodePad(this.httpStatus || 0, 3),
      ].join("-");
    }

    constructor(params: DaznErrorParams) {
        super(params.message);

        Object.setPrototypeOf(this, DaznError.prototype);

        this.category = this.errorCodePad(params.category, 2);
        this.code = this.errorCodePad(params.code, 3);
        this.httpStatus = params.httpStatus;
    }

    private errorCodePad(num: string | number, size: number): string {
      return String(`000${num}`).slice(-size);
    }

}
