/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as Image from "./Image";
import * as ProfileItem from "./ProfileItem";
import * as Entity from "./Entity";
export interface IProfileAtom {
    typeLabel?: string;
    headshot?: Image.IImage;
    items: Array<ProfileItem.IProfileItem>;
    entity?: Entity.IEntity;
}
export interface IProfileAtomArgs {
    typeLabel?: string;
    headshot?: Image.IImageArgs;
    items: Array<ProfileItem.IProfileItemArgs>;
    entity?: Entity.IEntityArgs;
}
export const ProfileAtomCodec: thrift.IStructCodec<IProfileAtomArgs, IProfileAtom> = {
    encode(args: IProfileAtomArgs, output: thrift.TProtocol): void {
        const obj: any = {
            typeLabel: args.typeLabel,
            headshot: args.headshot,
            items: args.items,
            entity: args.entity
        };
        output.writeStructBegin("ProfileAtom");
        if (obj.typeLabel != null) {
            output.writeFieldBegin("typeLabel", thrift.TType.STRING, 1);
            output.writeString(obj.typeLabel);
            output.writeFieldEnd();
        }
        if (obj.headshot != null) {
            output.writeFieldBegin("headshot", thrift.TType.STRUCT, 3);
            Image.ImageCodec.encode(obj.headshot, output);
            output.writeFieldEnd();
        }
        if (obj.items != null) {
            output.writeFieldBegin("items", thrift.TType.LIST, 4);
            output.writeListBegin(thrift.TType.STRUCT, obj.items.length);
            obj.items.forEach((value_1: ProfileItem.IProfileItemArgs): void => {
                ProfileItem.ProfileItemCodec.encode(value_1, output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[items] is unset!");
        }
        if (obj.entity != null) {
            output.writeFieldBegin("entity", thrift.TType.STRUCT, 5);
            Entity.EntityCodec.encode(obj.entity, output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IProfileAtom {
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
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.typeLabel = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_3: Image.IImage = Image.ImageCodec.decode(input);
                        _args.headshot = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.LIST) {
                        const value_4: Array<ProfileItem.IProfileItem> = new Array<ProfileItem.IProfileItem>();
                        const metadata_1: thrift.IThriftList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_5: ProfileItem.IProfileItem = ProfileItem.ProfileItemCodec.decode(input);
                            value_4.push(value_5);
                        }
                        input.readListEnd();
                        _args.items = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_6: Entity.IEntity = Entity.EntityCodec.decode(input);
                        _args.entity = value_6;
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
        if (_args.items !== undefined) {
            return {
                typeLabel: _args.typeLabel,
                headshot: _args.headshot,
                items: _args.items,
                entity: _args.entity
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read ProfileAtom from input");
        }
    }
};
export class ProfileAtom extends thrift.StructLike implements IProfileAtom {
    public typeLabel?: string;
    public headshot?: Image.IImage;
    public items: Array<ProfileItem.IProfileItem>;
    public entity?: Entity.IEntity;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IProfileAtomArgs) {
        super();
        if (args.typeLabel != null) {
            const value_7: string = args.typeLabel;
            this.typeLabel = value_7;
        }
        if (args.headshot != null) {
            const value_8: Image.IImage = new Image.Image(args.headshot);
            this.headshot = value_8;
        }
        if (args.items != null) {
            const value_9: Array<ProfileItem.IProfileItem> = new Array<ProfileItem.IProfileItem>();
            args.items.forEach((value_11: ProfileItem.IProfileItemArgs): void => {
                const value_12: ProfileItem.IProfileItem = new ProfileItem.ProfileItem(value_11);
                value_9.push(value_12);
            });
            this.items = value_9;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[items] is unset!");
        }
        if (args.entity != null) {
            const value_10: Entity.IEntity = new Entity.Entity(args.entity);
            this.entity = value_10;
        }
    }
    public static read(input: thrift.TProtocol): ProfileAtom {
        return new ProfileAtom(ProfileAtomCodec.decode(input));
    }
    public static write(args: IProfileAtomArgs, output: thrift.TProtocol): void {
        return ProfileAtomCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return ProfileAtomCodec.encode(this, output);
    }
}
