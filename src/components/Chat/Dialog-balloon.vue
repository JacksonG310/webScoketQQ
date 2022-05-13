<template>
    <div id="dialog" :class="direction">
        <div class="profile" >
            <slot name="profile"></slot>
        </div>
        <div class="content left-top" >
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{direction:{
        type:String,
    }},
}
</script>

<style lang="less">
    #dialog{
        margin-top: .4rem;
        width: 100%;
        display: flex;
        &.left{
            justify-content: flex-start;
            .profile{
                 margin-left: @less-spacing-row-16;
                margin-right: @less-spacing-row-10;
            }
            .content{
                background-color: #fff;
                border-radius: 0 .2rem .2rem .2rem !important;
            }
        }
        &.right{
            flex-flow: row-reverse;
            .profile{
                margin-left: @less-spacing-row-10;  
                margin-right: @less-spacing-row-16;
            }
            .content{
                border-radius: .2rem 0 .2rem .2rem !important;
                background-color: #ffe431;
            }
        }
        .profile{
            display: flex;
            align-items: flex-start;
            img{
                width: .8rem;
                height: .8rem;
                border-radius: .2rem;
            }
        }
        .content{
            max-width: 4.8rem;
            min-height: .8rem;
            height: auto;
            padding: .18rem .24rem;
            background-color: #fff;
            font-size: @less-text-size-16;
            img{
                    margin-top: .1rem;
                    width: 100%;
                    border-radius: 10px;
                }
        }

    }
</style>