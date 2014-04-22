#include <node.h>
#include <v8.h>
#include <string>

using namespace v8;
using namespace std;

Handle<Value> GetNodePosition(const Arguments &args) {
    HandleScope scope;

    Handle<Object> arr_hash_keys = args[0]->ToObject();
    String::Utf8Value str(args[1]->ToString());
    string hash = *str;
    
    int32_t len = arr_hash_keys->Get(String::NewSymbol("length"))->ToObject()->Int32Value();

    int32_t upper = len - 1;
    int32_t lower = 0;
    int32_t idx = 0;

    while (lower <= upper) {
        idx = (lower + upper) / 2;
        String::Utf8Value hash_key(arr_hash_keys->Get(idx)->ToString());
        string string_hash_key = *hash_key;

        if (string_hash_key.compare(hash) > 0) {
            upper = idx - 1;
        } else {
            lower = idx + 1;
        }
    }
    
    if (upper < 0) {
        upper = len - 1;
    }

    return scope.Close(Integer::New(upper));
}

void init(Handle<Object> exports, Handle<Object> module) {

    exports->Set(String::NewSymbol("getNodePosition"),
        FunctionTemplate::New(GetNodePosition)->GetFunction());

}

NODE_MODULE(chfuncs, init);
