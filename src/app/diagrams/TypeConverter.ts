export abstract class TypeConverter<I, O> {
    abstract convert(data: I): O;
}