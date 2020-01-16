/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IFlags {
    legallySensitive?: boolean;
    blockAds?: boolean;
    sensitive?: boolean;
}
export interface IFlagsArgs {
    legallySensitive?: boolean;
    blockAds?: boolean;
    sensitive?: boolean;
}
export const FlagsCodec: thrift.IStructCodec<IFlagsArgs, IFlags> = {
    encode(args: IFlagsArgs, output: thrift.TProtocol): void {
        const obj: any = {
            legallySensitive: args.legallySensitive,
            blockAds: args.blockAds,
            sensitive: args.sensitive
        };
        output.writeStructBegin("Flags");
        if (obj.legallySensitive != null) {
            output.writeFieldBegin("legallySensitive", thrift.TType.BOOL, 2);
            output.writeBool(obj.legallySensitive);
            output.writeFieldEnd();
        }
        if (obj.blockAds != null) {
            output.writeFieldBegin("blockAds", thrift.TType.BOOL, 3);
            output.writeBool(obj.blockAds);
            output.writeFieldEnd();
        }
        if (obj.sensitive != null) {
            output.writeFieldBegin("sensitive", thrift.TType.BOOL, 4);
            output.writeBool(obj.sensitive);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IFlags {
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
                case 2:
                    if (fieldType === thrift.TType.BOOL) {
                        const value_1: boolean = input.readBool();
                        _args.legallySensitive = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.BOOL) {
                        const value_2: boolean = input.readBool();
                        _args.blockAds = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.BOOL) {
                        const value_3: boolean = input.readBool();
                        _args.sensitive = value_3;
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
        return {
            legallySensitive: _args.legallySensitive,
            blockAds: _args.blockAds,
            sensitive: _args.sensitive
        };
    }
};
export class Flags extends thrift.StructLike implements IFlags {
    public legallySensitive?: boolean;
    public blockAds?: boolean;
    public sensitive?: boolean;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IFlagsArgs = {}) {
        super();
        if (args.legallySensitive != null) {
            const value_4: boolean = args.legallySensitive;
            this.legallySensitive = value_4;
        }
        if (args.blockAds != null) {
            const value_5: boolean = args.blockAds;
            this.blockAds = value_5;
        }
        if (args.sensitive != null) {
            const value_6: boolean = args.sensitive;
            this.sensitive = value_6;
        }
    }
    public static read(input: thrift.TProtocol): Flags {
        return new Flags(FlagsCodec.decode(input));
    }
    public static write(args: IFlagsArgs, output: thrift.TProtocol): void {
        return FlagsCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return FlagsCodec.encode(this, output);
    }
}
