/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IGeolocation {
    lat: number;
    lon: number;
}
export interface IGeolocationArgs {
    lat: number;
    lon: number;
}
export const GeolocationCodec: thrift.IStructCodec<IGeolocationArgs, IGeolocation> = {
    encode(args: IGeolocationArgs, output: thrift.TProtocol): void {
        const obj: any = {
            lat: args.lat,
            lon: args.lon
        };
        output.writeStructBegin("Geolocation");
        if (obj.lat != null) {
            output.writeFieldBegin("lat", thrift.TType.DOUBLE, 1);
            output.writeDouble(obj.lat);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[lat] is unset!");
        }
        if (obj.lon != null) {
            output.writeFieldBegin("lon", thrift.TType.DOUBLE, 2);
            output.writeDouble(obj.lon);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[lon] is unset!");
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IGeolocation {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.DOUBLE) {
                        const value_1: number = input.readDouble();
                        _args.lat = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.DOUBLE) {
                        const value_2: number = input.readDouble();
                        _args.lon = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        if (_args.lat !== undefined && _args.lon !== undefined) {
            return {
                lat: _args.lat,
                lon: _args.lon
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read Geolocation from input");
        }
    }
};
export class Geolocation extends thrift.StructLike implements IGeolocation {
    public lat: number;
    public lon: number;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IGeolocationArgs) {
        super();
        if (args.lat != null) {
            const value_3: number = args.lat;
            this.lat = value_3;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[lat] is unset!");
        }
        if (args.lon != null) {
            const value_4: number = args.lon;
            this.lon = value_4;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[lon] is unset!");
        }
    }
    public static read(input: thrift.TProtocol): Geolocation {
        return new Geolocation(GeolocationCodec.decode(input));
    }
    public static write(args: IGeolocationArgs, output: thrift.TProtocol): void {
        return GeolocationCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return GeolocationCodec.encode(this, output);
    }
}
