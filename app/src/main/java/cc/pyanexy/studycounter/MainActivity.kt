package cc.pyanexy.studycounter

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    private var count = 0
    private lateinit var counter: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        count = savedInstanceState?.getInt("count") ?: 0
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            val padding = (24 * resources.displayMetrics.density).toInt()
            setPadding(padding, padding, padding, padding)
            setBackgroundColor(Color.rgb(245, 247, 252))
            setOnApplyWindowInsetsListener { view, insets ->
                view.setPadding(padding, padding + insets.systemWindowInsetTop,
                    padding, padding + insets.systemWindowInsetBottom)
                insets
            }
        }
        fun label(text: String, size: Float) = TextView(this).apply {
            this.text = text
            textSize = size
            gravity = Gravity.CENTER
            setTextColor(Color.rgb(31, 41, 55))
        }
        layout.addView(label(getString(R.string.subtitle), 16f))
        layout.addView(label(getString(R.string.title), 26f))
        counter = label("", 72f)
        layout.addView(counter)
        layout.addView(Button(this).apply {
            setText(R.string.increase)
            setOnClickListener { if (count < Int.MAX_VALUE) count++; render() }
        })
        layout.addView(Button(this).apply {
            setText(R.string.reset)
            setOnClickListener { count = 0; render() }
        })
        setContentView(layout)
        render()
    }

    private fun render() {
        counter.text = count.toString()
        counter.contentDescription = getString(R.string.count_description, count)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        outState.putInt("count", count)
        super.onSaveInstanceState(outState)
    }
}
