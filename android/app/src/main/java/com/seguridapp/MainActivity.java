package com.seguridapp;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SeguridApp";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
            SplashScreen.show(this);  // here
            super.onCreate(savedInstanceState);
    }
    @Override
    public void invokeDefaultOnBackPressed() {
        // do not call super. invokeDefaultOnBackPressed() as it will close the app.  Instead lets just put it in the background.
        moveTaskToBack(true);
    }
}
