# ScrollViewRecycleRepro

Empty iOS React Native 0.87.1 application with navigation dependencies installed.
Requires Node >=22.11, Yarn 1, Ruby/CocoaPods and Xcode.

```sh
yarn
bundle install
cd ios && bundle exec pod install && cd ..
yarn start
# In another terminal:
yarn ios --simulator "iPhone 16 Pro"
```

Metro uses port 8086. RN Core is built from source.
